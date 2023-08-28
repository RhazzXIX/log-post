"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "./Loading";

export default function CommentForm() {
    // States.
    const [userComment, setUserComment] = useState('');
    // Handle user input.
    const handleCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUserComment(e.target.value)
    }
    // Handle comment submission.
    const submitComment = (e: FormEvent) => {
        e.preventDefault();
        alert('Message Submitted.')
    }

    //Render.
    return (
        <form action="" method="Post" onSubmit={submitComment}>
                <textarea id="comment" required value={userComment} onChange={handleCommentInput} placeholder="Add to the discussion..." cols={70} />
            <button type="submit">Submit</button>
        </form>
    )
}