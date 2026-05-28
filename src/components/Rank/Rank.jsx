import "./Rank.css";

const Rank = ({ user }) => {
  if (!user || !user.firstname) {
    return null;
  }

  const { firstname, entries } = user;
  const formattedName = firstname.charAt(0).toUpperCase() + firstname.slice(1);

  return (
    <div className="rank-container">
      <h2>{formattedName}, your current entry count is...</h2>
      <h2 className="rank-entries">#{entries}</h2>
    </div>
  );
};

export default Rank;
