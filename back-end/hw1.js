const { response } = require('express');
const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


const sql = mysql.createPool({
    namedPlaceholders: true,
    charset: 'utf8',
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "hackathon",
})

app.get('/getALL', (req, res) => {
    sql.query('select * from p_ordstatus_detail_ng', (err, result) => {
        if (err) {
            return res.status(400).json(err)
        }
        return res.json({ data: result });
    })

})

app.get('/getOrderId', (req, res) => {
    const SExternOrder = req.body.sExternOrderno;
    sql.query(`SELECT pdt.I_ORDER,pdt.I_DETAIL,pdt.C_STATUS FROM p_ordsum psum INNER JOIN p_orddet pdt on pdt.I_ORDER = psum.I_ORDER WHERE psum.S_EXTERN_ORDERNO = ${SExternOrder};`, (err, result) => {
        if (err) {
            return res.status(400).json(err)
        }
        return res.json({ data: result });
    })

})


app.post('/newOrderId', (req, res) => {
    const Dcreate = Date.now();
    const DcreateNow = new Date(Dcreate);
    const Dchange = Date.now();
    const DchangeNow = new Date(Dchange);
    const DcancelReason = Date.now();
    const DcancelReasonNow = new Date(DcancelReason);
    const DtimeStamp = Date.now();
    const DtimeStampNow = new Date(DtimeStamp);
    if (req.body.orderNo == "" ||
        req.body.status == "") {
        return res.status(400).send("โปรดกรอกข้อมูลให้ครบถ้วน");
    }

    const insert = 'insert into p_ordstatus_detail_ng value (:OrderId, :Status, :I_DETAIL ,:cProcess ,:cPType ,:d_create ,:d_change ,:d_timestamp, :c_cancel_reason, :c_send_edn, :d_send_edn)'
    sql.query(insert, {
        OrderId: req.body.orderNo,
        Status: req.body.status,
        I_DETAIL: req.body.Idetayl,
        cProcess: req.body.cp,
        cPType:req.body.cpt,
        d_create:DcreateNow,
        d_change:DchangeNow,
        d_timestamp:DtimeStampNow,
        c_cancel_reason:req.body.c_cancel_reason,
        c_send_edn:req.body.c_send_edn,
        d_send_edn:DcancelReasonNow

    }, (err, result) => {

        if (err) {
            return res.status(400).json({ data: "เพิ่มข้อมูลไม่สำเร็จ" })
        }
        return res.json({ data: "เพิ่มข้อมูลสำเร็จ" })

    })
})



app.put('/editEmployee', (req, res) => {

    if (!req.body.id) {
        return res.status(400).send("Error")
    }

    const update = 'update p_ordstatus_detail_ng set I_ORDER = :I_ORDER, C_STATUS = :C_STATUS where OrderId = :id '
    sql.query(update, {
        id: req.body.id,
        I_DETAIL: req.body.IOrder,
        C_STATUS: req.body.Cstatus
    }, (err, result) => {

        if (err) {
            return res.status(400).json(err)
        }
        if (result.affectedRows == 0) {
            return res.status(400).json({ data: "ไม่่พบ ID" })
        }
        return res.json({ data: "แก้ไขสำเร็จ" })

    })

})

app.delete('/deleteOrderId', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send("Error")
    }
    const remove = 'delete from p_ordstatus_detail_ng where OrderId = :id'
    sql.query(remove, {
        id: req.body.id

    }, (err, result) => {
        if (err) {
            return res.status(400).json(err)
        }
        if (result.affectedRows == 0) {
            return res.status(400).json({ data: "ไม่่พบ ID" })
        }
        return res.json({ data: "แก้ไขสำเร็จ" })

    })


})


app.listen(3000, () => {
    console.log('Listening on port: 3000');
});