import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

//// context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

//// actions
import { createFilm } from '../../reducer/galaxyFilmActions';

// cpns
import Spinner from '../../components/Spinner';

function CreateFilm() {
  const { users, loading, dispatch } = useGalaxyFilmContext();

  const [formData, setFormData] = useState({
    titleEn: '',
    titleVi: '',
    type: '',
    country: '',
    releaseDate: '',
    producer: '',
    director: '',
    poster: '',
    banner: '',
    description: '',
    createdDate: '',
    actor: '',
  });

  const {
    titleEn,
    titleVi,
    type,
    country,
    releaseDate,
    producer,
    director,
    poster,
    banner,
    description,
    actor, ////
  } = formData;

  const history = useHistory();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      titleVi === '' ||
      titleEn === '' ||
      type === '' ||
      country === '' ||
      // releaseDate === '' ||
      producer === '' ||
      director === '' ||
      description === '' ||
      actor === '' ////
    ) {
      console.log(formData);
      toast.error('Please enter data in all fields');
      return;
    } else {
      const filmData = {
        titleEn,
        titleVi,
        type,
        country,
        releaseDate,
        producer,
        director,
        poster,
        banner,
        description,
        actor,
      };

      const token = localStorage.getItem('token');

      dispatch({ type: 'SET_LOADING' });
      const resultFilm = await createFilm(filmData, token);

      dispatch({ type: 'OFF_LOADING' });
      console.log('hehe: ', resultFilm);
      if (resultFilm.isSuccess) {
        toast.success(resultFilm.message);
        setTimeout(() => {
          history.push('/');
        }, 2000);
      } else {
        toast.error(resultFilm.message);
        return;
      }
    }

    // console.log(formData);
  };

  return (
    <>
      <div className='container'>
        <div className='registerWrap'>
          <section className='heading'>
            <h1>Create New Film</h1>
          </section>

          <section className='form'>
            <form onSubmit={onSubmit}>
              {/* title english */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='titleEn'
                  name='titleEn'
                  value={titleEn}
                  onChange={onChange}
                  placeholder='Enter title english'
                  required
                />
              </div>

              {/* titleVi */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='titleVi'
                  name='titleVi'
                  value={titleVi}
                  onChange={onChange}
                  placeholder='Enter title vietnamese'
                  required
                />
              </div>

              {/* type */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='type'
                  name='type'
                  value={type}
                  onChange={onChange}
                  placeholder='Enter type of the film'
                  required
                />
              </div>

              {/* country */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='country'
                  name='country'
                  value={country}
                  onChange={onChange}
                  placeholder='Enter name of country made of this film'
                  required
                />
              </div>

              {/* producer */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='producer'
                  name='producer'
                  value={producer}
                  onChange={onChange}
                  placeholder='Enter name of the producer'
                  required
                />
              </div>

              {/* director */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='director'
                  name='director'
                  value={director}
                  onChange={onChange}
                  placeholder='Enter name of director'
                  required
                />
              </div>

              {/* description */}
              <div className='form-group'>
                <textarea
                  type='text'
                  className='form-control'
                  id='description'
                  name='description'
                  value={description}
                  onChange={onChange}
                  placeholder='Enter name description'
                  required
                />
              </div>

              {/* actor */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='actor'
                  name='actor'
                  value={actor}
                  onChange={onChange}
                  placeholder='Enter name of all actors'
                  required
                />
              </div>

              {/* poster */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='poster'
                  name='poster'
                  value={poster}
                  onChange={onChange}
                  placeholder='Enter poster url'
                  // required
                />
              </div>

              {/* banner */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='banner'
                  name='banner'
                  value={banner}
                  onChange={onChange}
                  placeholder='Enter banner img url'
                  // required
                />
              </div>

              {/* releaseDate */}
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='releaseDate'
                  name='releaseDate'
                  value={releaseDate}
                  onChange={onChange}
                  placeholder='Enter the release Date of film'
                  required
                />
              </div>

              <div className='form-group'>
                <button className='btn btn-block'>Create</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default CreateFilm;
