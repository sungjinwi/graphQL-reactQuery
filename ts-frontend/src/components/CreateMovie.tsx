import useInput from "../hooks/useInput";
import useMutationAddMovie from "../hooks/useMutationAddMovie";
import useQueryMovieList from "../hooks/useQueryMovieList";

const CreateMovie = () => {

  const {data}:any = useQueryMovieList;

  const titleInputProps = useInput('');
  const directorInputProps = useInput('');

  const {addMutation} = useMutationAddMovie(titleInputProps.value, directorInputProps.value);

  return (
    <>
    <input placeholder='영화 제목' {...titleInputProps} />
    <input placeholder='영화 감독' {...directorInputProps} />
    <button 
      onClick={()=> addMutation.mutate()}
    >
      영화 추가
    </button>
    </>
  )
}

export default CreateMovie