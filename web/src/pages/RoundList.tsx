import { useRounds } from "../entities/round/hooks";
import { CreateRoundButton } from "../features/round/CreateRoundButton";
import { getUser } from "../shared/lib/auth";
import { RoundList } from "../widgets/round-list/RoundList";

export default function RoundListPage() {
    const user = getUser();
    const { data: rounds = [], isLoading, isError } = useRounds();
  
    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка загрузки</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold text-gray-300 mb-6">
        Список раундов
      </h1>

      {user?.role === "admin" &&
            <>
                <CreateRoundButton />
            </>  
       } 
       <RoundList rounds={rounds} />
    </div>
  );
}
