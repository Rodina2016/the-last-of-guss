import { useCreateRound } from "../../entities/round/hooks";



export const CreateRoundButton = () => {
    const { mutate } = useCreateRound();

    const handleClick = () => {
      mutate();
    };

  return (
    <button onClick={handleClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" >
        Создать раунд
    </button>
  );
};
