import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const Datatable = () => {


  let [Get, setGet] = useState([]);
  let [Search, setSearch] = useState("")
  let name = useRef();
  let email = useRef();
  let gender = useRef();
  let mobile = useRef();


  //get data
  let get = () => {
    axios.get("http://localhost:3004/serach").then((res) => {
      console.log(res.data);
      setGet(res.data);
    })
  }

  //post data
  let postdata = () => {
    let addobj = {
      name: name.current.value,
      email: email.current.value,
      gender: gender.current.value,
      mobile: mobile.current.value
    };

    axios.post("http://localhost:3004/serach", addobj).then((res) => {
      console.log(res.data);
      setGet([...Get, res.data])
      name.current.value = "";
      email.current.value = "";
      gender.current.value = "";
      mobile.current.value = "";
    })
  }
  useEffect(() => {
    get();
  }, [])

  const searchdata = Get.filter((e) => {
    return e.name.toLowerCase().includes(Search.toLowerCase())
  });

  return (
    <>
      <div class="text-center ">
        <label> NAME :-
          <input type="text" name='name' placeholder="Enter your name" ref={name} />
        </label><br />
        <label>EMAIL :-
          <input type="email" name='email' placeholder="Enter your email" ref={email} />
        </label><br />
        <label> Gender :-
          <input type="text" name='gender' placeholder="Enter your gender" ref={gender} />
        </label><br />
        <label >MOBIL NO :-
          <input type="text" name='mobile' placeholder="Enter your phone number " ref={mobile} />
        </label><br />
        <button onClick={postdata}>Submit</button>
      </div>
      <input type="text" onChange={(e) => setSearch(e.target.value)} value={Search} name="search" placeholder='Search name' />


      <table cellpadding="10px" className="col-12 text-center table-bordered  border-secondary">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>
          {
            searchdata.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.mobile}</td>
                </tr>
              )
            })

          }

        </tbody>
      </table>
    </>
  )
}

export default Datatable