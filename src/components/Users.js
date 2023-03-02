import React, {Component, useEffect, useState} from "react";
import axios from "axios";


async function UpdateAmount(id, type){ 
    const headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
        // 'Access-Control-Allow-Methods': '*',
        "Content-Type": "application/json"
      }; 
    let amount = 0
    let atm = { id: id, user_atm: { amount: 0}, type: true}
    if(type == 1){
        amount = document.getElementById('withdrawals_'+id).value
        atm.user_atm.amount = amount
    }else if( type == 2){
        amount = document.getElementById('deposit_'+id).value
        atm.user_atm.amount = amount
        atm.type = false
    }
    await axios
        .put("https://atmapi.fly.dev/api/update/", atm, {headers: headers})
        .then((response) => {
            console.log('Ya sirvió')
            console.log('Response update withh ', response)
        });

}


function Users(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            await axios
            .get("https://atmapi.fly.dev/api/index")
            .then((response) => {
                setUsers(response.data.users);
            });
        }
        
        getUsers();
    }, []);
    return(
        <div>
            <table>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Miembro Desde</th>
                    <th>Última actualización</th>
                    <th>Saldo</th>
                    <th>Retiros</th>
                    <th>Depósitos</th>
                    </tr>   
                </thead>   
                <tbody>
                    {
                        users.map( (users, key) =>
                            <tr key={key}>
                                <td className="table-data">{users.nick_name }</td>
                                <td className="table-data">{users.inserted_at.split('T')[0] }</td>
                                <td className="table-data">{users.updated_at.replace('T', ' ')}</td>
                                <td className="table-data">{users.balance}</td>
                                <td className="table-data">

                                    <input className="col-md-3" type="number" name={'withdrawals_'+users.id} id={'withdrawals_'+users.id} defaultValue="0" ></input>
                                    <button className="btn btn-warning" onClick={(e) => UpdateAmount(users.id, 1)}>Retirar</button>
                                </td>
                                <td className="table-data">

                                    <input className="col-md-3" type="number" name={'deposit_'+users.id} id={'deposit_'+users.id} defaultValue="0" ></input>
                                    <button className="btn btn-info" onClick={(e) => UpdateAmount(users.id, 2)}>Depositar</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        
    )
}

export default Users;