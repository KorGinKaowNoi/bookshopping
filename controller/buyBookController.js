let date = new Date();
const email = require('../config/email');
exports.checkAndBuy = (req,res)=>{
    let buyer={} ;
    let book ={};
    const user =req.session.thisuser
    const thatbook = req.params.id;
    let seller = {};
    const getUserData =  (data,cb)=>{
        const query = 'select * from usersdetails where user_id=?'
        db.query(query,[data],async (err,result)=>{
            if(err) throw err;
            return await cb(result[0]);
        });
    }
    const getBook = (data,cb)=>{
        let query = 'select * from shopcart where SSID =?'
        db.query(query,[data],async (err,result)=>{
            if(err) throw err;
            return await cb(result[0]);
        })
    };
    const getSeller = (data,cb)=>{
        let query = 'select * from usersdetails inner join reader using(user_id) where user_id=?'
        db.query(query,[data],async (err,result)=>{
            if(err) throw err;
            return await cb(result[0]);
        })
    }
    getUserData(user,async (result)=>{
        buyer = await result
    });
    getBook(thatbook,async (result)=>{
        book=await result;
    })
    setTimeout(()=>{

        if(buyer.user_balance<book.book_price){
            req.flash('danger','your current balance is not enough')
            res.redirect('/shopcart');
        }else{
            const tier = buyer.userTier;
            console.log(tier)
            let discount=1;
            if(tier==='gold'){
                discount=0.9;
            }else if(tier==='silver'){
                discount=0.95;
            }
            const hasleft =  buyer.user_balance-(book.book_price*discount);
            const income = (book.book_price*discount);
            let query = 'update usersdetails set user_balance=? where user_id=?'
            db.query(query,[hasleft,user],(err)=>{
                if(err) throw err;
            });
            getSeller(book.user_id,(result)=>{
                seller = result;
            })
            setTimeout(()=>{
                db.query(query,[income+seller.user_balance,seller.user_id],(err,result)=>{
                    if(err) throw err;
                })
                query = 'update usersdetails set user_payment=? where user_id=?'
                db.query(query,[buyer.user_payment+income,buyer.user_id],(err)=>{
                    if(err) throw err;
                    const checkPayment = 'select user_payment from usersdetails where user_id=?'
                    db.query(checkPayment,[buyer.user_id],(error,result)=>{
                        if(error) throw err;
                        let update = 'update usersdetails set userTier=? where user_id=?'
                        if(result[0].user_payment>3000){
                            db.query(update,['silver',buyer.user_id],(err)=>{
                                if(err) throw err;
                            })
                        }else if(result[0].user_payment>7000){
                            db.query(update,['gold',buyer.user_id],(err)=>{
                                if(err) throw err;
                            })
                        }
                    })
                })
                query = 'update orderdetails set payment_date = ? where user_id=?'
                const time = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}(${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`
                db.query(query,[time,user],(err)=>{
                    if(err) throw err;
                });
                query = 'delete from shopcart where SSID=?'
                db.query(query,[thatbook],(err)=>{
                    if(err) throw err;
                });
                query= 'update bookdetails set user_id=? , onMarket=? where SSID=?'
                db.query(query,[user,'no',thatbook],(err)=>{
                    if(err) throw err;
                    req.flash('success','your new book has been store in your catalog now');
                    res.redirect('/users/'+user+'/mybook');
                })
                let  mailOptions = {
                    from: 'bookshopProjectNoreply@gmail.com',
                    to: seller.user_email,
                    subject: 'order details',
                    html: '<b>your order have been ordered</b>'
                };
                email.emailing.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(info)
                    }
                })
            },1500)
        }
    },1500)
}
