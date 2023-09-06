import { useParams } from "react-router"
import { useState,useEffect } from 'react'

import axios from 'axios'
function ViewDetails() {

    var [candidateData, setCandidateData] = useState({})
    var [firstname, setFirstname] = useState()
    var [userid, setUserId] = useState()
    // let { paramId } = useParams()
    

    useEffect(() => {
       setUserId(localStorage.getItem("userId")) 
       console.log(userid);
        setFirstname(localStorage.getItem("firstname"))
       console.log(firstname);

    }, [candidateData])

    const getCandidateInfo = () => {
       let paramId=firstname+"_"+userid 
        console.log("entered param", paramId)
       console.log(firstname);

        axios.post('/fetchcandidateinfo', { "userid": paramId })
            .then(response => {
                console.log(response.data.result)
                setCandidateData(response.data.result)
                console.log("data from server", candidateData)

            })
            .catch(erro => {
                console.log("User profile not found",erro) //to be updated with new ui alert
            })


        
    }

        return (
            <div>
                <h2>
                    This is portfolio page of 
                    <br/>

              <button onClick={getCandidateInfo()}>getcandidateinfo</button>
                </h2>
                <div>
                    {firstname}
                </div>
            </div>
        )
}
    

export default ViewDetails
