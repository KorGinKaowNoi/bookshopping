exports.showHistory = (req,res)=>{
    const queryHistory = 'select SSID,payment_date,bookname from orderdetails inner join bookdetails using(SSID) where orderdetails.user_id=?'
    const user = req.session.thisuser;
    db.query(queryHistory,[user],(err,result)=>{
        if(err) throw err;
        if(!result[0]){
            res.render('historypage',{text:'your history is empty'});
        }else
            for(let i=0;i<result.length;i++){
                if(result[i].payment_date===null){
                    result[i].payment_date='order not yet purchase'
                }
                res.render('historypage',{historyDetail:result});
        }
    })
};
