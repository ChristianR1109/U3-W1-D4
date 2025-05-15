const CommentsList = ({ comments }) => (
  <ul>
    {comments.map((comment) => (
      <li key={comment._id}>
        {comment.author}: {comment.comment} (⭐ {comment.rate})
      </li>
    ))}
  </ul>
);

export default CommentsList;
