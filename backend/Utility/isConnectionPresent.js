const isConnectionPresent = (connectionArray, connections_id) => {
  let present = false;
  //connection-list should not be empty list
  if (connectionArray.length === 0) return present;

  for (let connection of connectionArray) {
    if (connection.id.equals(connections_id)) {
      present = true;
      break;
    }
  }

  return present;
};

module.exports = isConnectionPresent;
