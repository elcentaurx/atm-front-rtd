import React, {Component, useEffect, useMemo, useState} from "react";
import axios from "axios";


function UpdateAmount(id){
    
    console.log('Yes', id)
    console.log('am ', )

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
                                    <button className="btn btn-warning" onClick={(e) => UpdateAmount(users.id)}>Retirar</button>
                                </td>
                                <td className="table-data">

                                    <input className="col-md-3" type="number" name={'deposit_'+users.id} id={'deposit_'+users.id} defaultValue="0" ></input>
                                    <button className="btn btn-info" onClick={(e) => UpdateAmount(users.id)}>Depositar</button>
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