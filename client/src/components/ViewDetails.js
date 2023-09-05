import { useParams } from "react-router"
import { useState,useEffect } from 'react'

import axios from 'axios'
function ViewDetails() {

    var [candidateData, setCandidateData] = useState({})
    let { paramId } = useParams()


    // useEffect(() => {
    //     getCandidateInfo()
    // }, [])

    const getCandidateInfo = () => {
        console.log("entered param", paramId)

        axios.post('/fetchcandidateinfo', { userid: paramId })
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
                    This is portfolio page of {paramId}
                    <br/>

              <button onClick={getCandidateInfo()}>getcandidateinfo</button>
                </h2>
                <div>
                    {candidateData.firstname}
                </div>
            </div>
        )
}
    

export default ViewDetails
