import React, {useState, useEffect} from "react";
// import { Link, Redirect } from "react-router-dom";
// import RespondentSelector from "./RespondentSelector"
// import QuestionsContainer from "./QuestionsContainer"
// import { RadioInputContext } from "../../contexts/RadioInputContext"
import PollHeader from "./PollHeader"
import RespondentSelector from "./RespondentSelector"
import QuestionsContainer from "./QuestionsContainer"

export default function PollDisplay({pollID}) {
  const [mounted, setMountStatus] = useState(false);
  const [data, setData] = useState({});
  const [respondentID, setRespondentID] = useState(null);

  useEffect(() => {
    if (!mounted) {
      const url = "/api/v1/polls/" + pollID

      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error")
        })
        .then((data) => {
          setMountStatus(true);
          setData(data);
        })
        .catch((err) => console.error("unknown error " + err));
    }
  })

  if (data.POLL && data.AUTHOR) {
    return (
      <form
        className = "poll-display"
        id = "main-poll-form"
      >
        <PollHeader poll = {data.POLL} author = {data.AUTHOR} />
        <RespondentSelector handleSelectChange = {setRespondentID} />
        <QuestionsContainer
          questions = {data.QUESTIONS}
          responseOptions = {data.RESPONSE_OPTIONS}
        />
        <button
          className = "poll-submit-btn submit-btn"
          form = "main-poll-form"
          type = "submit"
        >
          Submit!
        </button>
      </form>
    )
  } else {
    if (mounted) {
      return <h2>No such poll with id {pollID}</h2>
    } else {
      return <h2>Loading ...</h2>
    }
  }
}

// export default class PollDisplay extends React.Component {
//   // props: poll_id
//   constructor (props) {
//     super(props)
//     this.state = {
//       dataLoaded: false,
//       response: {
//         submitted: false
//       }
//      }
//
//     this.loadData = this.loadData.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.onRadioChange = this.onRadioChange.bind(this)
//     this.onSelectChange = this.onSelectChange.bind(this)
//     this.pushResponse = this.pushResponse.bind(this)
//   }
//
//   loadData(poll_id) {
//
//   }
//
//   componentDidMount() {
//     const poll_id = this.props.poll_id
//     this.loadData(poll_id);
//   }
//
//   onSelectChange(user_id) {
//     this.setState({ respondent_id: user_id })
//   }
//
//   handleSubmit (event) {
//     event.preventDefault();
//     this.pushResponse()
//   }
//
//   pushResponse () {
//     const response_url = "/api/v1/responses"
//     const response_values = {
//       poll_id: this.props.poll_id,
//       respondent_id: this.state.respondent_id,
//     }
//     fetch(response_url, {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(response_values)
//     })
//       .then((data) => {
//         if (data.ok) {
//           // console.log('response data sent 200 OK')
//           return data.json()
//         } else if (data.status == "422") {
//           // console.log('response data denied 422')
//           // data.json().then(errors => console.log(errors))
//         } else {
//           throw new Error("unknown server/network error at response level")
//         }
//       })
//       .then((data) => {
//         const response_id = data.id;
//         const answers = this.state.answers;
//         const answer_url = `/api/v1/responses/${response_id}/answers`
//         // console.log(response_id, answers, answer_url)
//         for (const [question_id, response_option_id] of Object.entries(answers)) {
//           var answer_values = {
//             response_id: response_id,
//             question_id: question_id,
//             response_option_id: response_option_id,
//           }
//           fetch(answer_url, {
//             method: "post",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(answer_values),
//           })
//             .then((data) => {
//               if (data.ok) {
//                 return data.json()
//               } else if (data.status == "422" ) {
//               } else {
//                 throw new Error(`unknown server/network error at question_id ${question_id}`)
//               }
//             })
//             .catch((err) => console.error(`error catch at question_id ${question_id}`))
//           }
//         return data
//         })
//         .then((data) => {
//           // console.log('logging data for redirect test')
//           // console.log(data)
//           const response = {
//             submitted: true,
//             path: `/responses/${data.id}`
//           }
//           this.setState({
//             response: response
//           })
//         })
//         .catch((err) => console.error("error catch at response level: "+ err))
//   }
//
//
//
//   render () {
//     const response = this.state.response;
//     if (response.submitted) {
//       return (
//         <Redirect to={ response.path } />
//       )
//     }
//     if (this.state.dataLoaded) {
//       const data = this.state.data
//       return (
//         <form
//           className = "poll-display"
//           onSubmit = {this.handleSubmit}
//           id = "main-poll-form"
//         >
//           <PollHeader poll = {data.POLL} author = {data.AUTHOR} />
//           <RespondentSelector onSelectChange = {this.onSelectChange} />
//           <RadioInputContext.Provider value = {this.onRadioChange} >
//             <QuestionsContainer
//               questions = {data.QUESTIONS}
//               response_options = {data.RESPONSE_OPTIONS}
//             />
//           </RadioInputContext.Provider>
//           <button
//             className = "poll-submit-btn submit-btn"
//             form = "main-poll-form"
//             type = "submit"
//           >
//             Submit!
//           </button>
//         </form>
//       )
//     }
//     return (
//       <div className = "poll-header">
//         Loading ...
//       </div>
//     )
//   }
// }
