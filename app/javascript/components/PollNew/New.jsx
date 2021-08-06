import React, {useState, useEffect} from "react";

export default function PollNew(props) {
  // props: empty
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author_id, setAuthorID] = useState("");
  
  return (
    <div className = "new-poll-display flex-container-column">
      <div className="new-poll-title">New Poll!</div>
      <form
        id="new-poll-form"
        onSubmit = { e => onFormSubmit(e, [title, description, author_id]) }
        className = "new-poll-form flex-container-column"
      >
        <PollFieldInput name = "title" passData = { setTitle }/>
        <PollFieldInput name = "description" passData = { setDescription }/>
        <AuthorSelector passData = { setAuthorID }/>
        <NewPollSubmitBtn />
      </form>
    </div>
  )
}

function onFormSubmit(e, values) {
  e.preventDefault()
  values.forEach((value, i) => {
    console.log(value)
  })
}

function onChangeSetValue(e, callback) {
  callback(e.target.value)
}

function PollFieldInput(props) {
  // props: name ["title", "description"]
  const name = props.name
  const passData = props.passData
  const [value, setValue] = useState("")

  useEffect(() => {
    props.passData(value)
  })

  return (
    <input
      className = "poll-field-input"
      name = { name }
      placeholder = { name }
      value = { value }
      onChange = { e => onChangeSetValue(e, setValue) }
    />
  )
}

function AuthorSelector(props) {
  const [users, setUsers] = useState([]);
  const [loaded, setLoadStatus] = useState(false);
  const [selectValue, setSelectValue] = useState("default")

  const passData = props.passData;

  useEffect(() => {
    const url = "/api/v1/users";
    if (loaded == false) {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json()
          }
          throw new Error("network and/or server error")
        })
        .then((data) => {
          setUsers(data)
          setLoadStatus(true)
        })
        .catch((err) => console.error("unknown error " + err))
    }
  })

  if (users.length) {
    const selectOptions = users.map((user, index) => {
      return (
        <option
          key = {index}
          value = {user.id}
          >
            {user.username.toUpperCase()}
        </option>
      )
    })
    return (
      <div className = "author-selector">
        <label>
          Author:
            <select
              name = "author"
              id = "author"
              value = { selectValue }
              onChange = { e => {
                const value = e.target.value
                passData(value)
                setSelectValue(value)
              } }
            >
              <option value="default" disabled hidden>--SELECT--</option>
              {selectOptions}
            </select>
        </label>
      </div>
    )
  } else {
    if (loaded) {
      return <h2>no users to display!</h2>
    } else {
      return <h2>Loading ...</h2>
    }
  }
}

function NewPollSubmitBtn(props) {
  return (
    <button
      className = "new-poll-create-btn"
      form = "new-poll-form"
      type = "submit"
    >Create!</button>
  )
}
