let date = new Date();
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
            //console.log(result[0])
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
        let query = 'select * from usersdetails where user_id=?'
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
            const hasleft =  buyer.user_balance-book.book_price;
            let query = 'update usersdetails set user_balance=? where user_id=?'
            db.query(query,[hasleft,user],(err)=>{
                if(err) throw err;
            });
            getSeller(book.user_id,(result)=>{
                seller = result;
            })
            setTimeout(()=>{
                db.query(query,[book.book_price+seller.user_balance,seller.user_id],(err,result)=>{
                    if(err) throw err;
                })
                query = 'update usersdetails set user_payment=? where user_id=?'
                console.log(buyer.user_payment,book.book_price,buyer.user_id)
                db.query(query,[buyer.user_payment+book.book_price,buyer.user_id],(err)=>{
                    if(err) throw err;
                })
                query = 'update orderdetails set payment_date = ? where user_id=?'
                const time = date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear();
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
            },1500)
        }
    },1500)
}