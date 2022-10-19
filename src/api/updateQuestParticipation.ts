import genericPut from "./utils/genericPut";

const updateQuestParticipation = (
  user_id: string,
  quest_id: string,
  status: number
) => {
  const data = { status: status };
  genericPut(`questParticipations/${user_id}/${quest_id}`, data);
};

export default updateQuestParticipation;
