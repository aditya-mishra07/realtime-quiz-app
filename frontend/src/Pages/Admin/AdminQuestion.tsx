const AdminQuestion = () => {
  return (
    <div className=" flex flex-col justify-center items-center h-screen w-full bg-purple-500">
      <div className="flex flex-col min-h-64 min-w-80 bg-white rounded-lg px-20 shadow-lg">
        <div className="text-gray-600 text-3xl font-semibold my-5">
          <h4>What is the best frontend framework?</h4>
        </div>
        <div className="shadow-md rounded-3xl p-4 mt-4 my-2 " role="button">
          React
        </div>
        <div className="shadow-md rounded-3xl p-4 my-2" role="button">
          Svelte
        </div>
        <div className="shadow-md rounded-3xl p-4 my-2" role="button">
          Vue
        </div>
        <div className="shadow-md rounded-3xl p-4 my-2" role="button">
          Angular
        </div>
        <div className="flex items-center mt-20 justify-center">
          <button className=" bg-purple-500 p-2 text-white text-center rounded-lg font-medium m-2">
            Next Question
          </button>
          <button className=" bg-purple-500 p-2 text-white text-center rounded-lg font-medium m-2">
            Show Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestion;
