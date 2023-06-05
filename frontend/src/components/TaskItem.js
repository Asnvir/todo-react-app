import React, {useState} from "react";
import {Spinner} from "./Spinner";
import {debounce} from 'lodash'

const TaskItem = ({taskItem, onUpdate, loading, onRemove, onCompleted}) => {

    const [isEditMode, setEditMode] = useState(false)
    //if this value null of undefined => fallback with the value from the right side
    //it is nullish operator like OR operator but triggers only on NULL or UNDEFINED
    const [title, setTitle] = useState(taskItem.title ?? "")

    const [isCompleted, setCompleted] = useState(taskItem.completed === "true")

    const debouncedDelete = debounce(onRemove, 1000)

    const handleComplete = (event) => {
        const result = event.target.checked
        onCompleted(JSON.stringify(result))
        setCompleted(result)
    }

    const buttons = (
        <>
            {isEditMode ? (
                <button className="save-button"
                        onClick={async () => {
                            await onUpdate(title)
                            setEditMode(false)
                        }}>Save
                </button>
            ) : (
                <button className="edit-button"
                        onClick={() => {
                            setEditMode(true)
                        }}>Edit
                </button>
            )}
            <button className="delete" onClick={debouncedDelete}>Delete
            </button>
        </>)


    return (
        <div className="todo-item">
            <div className="todo-item-checkbox">
                <input
                    type="checkbox" checked={isCompleted}
                    onChange={(event) => handleComplete(event)}/>
            </div>
            <div className="todo-item-title">
                {isEditMode ? (
                    <input
                        type="text"
                        value={title} onChange={e => {
                        setTitle(e.target.value)
                    }
                    }/>
                ) : (<span>{taskItem.title}</span>)}
            </div>
            <div className="todo-item-buttons">
                {loading ? (<Spinner/>) : buttons}
            </div>
        </div>
    )
}

export default TaskItem;