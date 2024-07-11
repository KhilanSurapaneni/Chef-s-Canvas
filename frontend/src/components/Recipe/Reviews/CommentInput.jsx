import React from 'react';
import { handleChange } from './functions';

const CommentInput = ({ review, setReview }) => {
  return (
    <div className="mb-6">
      <textarea
        id="comment"
        name="comment"
        value={review.comment}
        onChange={(e) => handleChange(e, setReview, review)}
        className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        rows="5"
        required
      ></textarea>
    </div>
  );
};

export default CommentInput;
