import React, {useEffect, useState} from "react";
import axios from "axios";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';


export async function UpdateAmount(id, type){ 
    const headers = {
       "Content-Type": "application/json"
    }; 
    let amount = 0
    let atm = { id: id, user_atm: { amount: 0}, type: true}
    if(type === 1){
        amount = parseInt(document.getElementById('withdrawals_'+id).value)
        atm.user_atm.amount = amount
    }else if( type === 2){
        amount = parseInt(document.getElementById('deposit_'+id).value)
        atm.user_atm.amount = amount
        atm.type = false
    }
    await axios
        .put("https://atmapi.fly.dev/api/update/", atm, {headers: headers})
        .then((response) => {
            if(response.data.ok){
                alertify.success('Transacción exitosa')
            }else if(response.data.error){
                alertify.warning('Transacción no exitosa')
            }
            else{
                alertify.error('Error')
            }
            document.getElementById('withdrawals_'+id).value = 0
            document.getElementById('deposit_'+id).value = 0
        }).catch( err => {
            console.error('ATM error ', err)
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
    }, [users]);
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