import { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

//// Context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

const dateFormatList = ['DD/MM/YYYY'];

function SearchFilmForm() {
  const { films, filteredFilms, dispatch, useDebounce } =
    useGalaxyFilmContext();
  // const [filteredFilms, setFilteredFilms] = useState([]);

  const [filmName, setFilmName] = useState('');
  const [filmTime, setFilmTime] = useState('');

  const pickerDefaultDate = new Date();

  //// 2 functions for date picker
  // function onChange(value, dateString) {
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  // }

  function onOk(value, dateString) {
    // console.log('onOk: ', value._d);
    // console.log('onOk2: ', typeof value._d);

    const resultDate = getCurrentDate(value._d);
    // console.log('resultDate: ', resultDate);
    setFilmTime(resultDate);
  }

  function getCurrentDate(value) {
    const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
    const month =
      value.getMonth() + 1 < 10
        ? `0${value.getMonth() + 1}`
        : `${value.getMonth() + 1}`;
    const date = `${value.getFullYear()}--${month}--${day}`;

    return date;
  }

  const onChangeForm = (e) => setFilmName(e.target.value);

  const clearSearch = () => {
    setFilmName('');
    setFilmTime('');
    dispatch({ type: 'CLEAR_SEARCH' });
  };

  /// /// search filter
  useEffect(() => {
    if ((filmName === '' && filmTime === '') || films.length === 0) return;

    let newFilmsSearch = films.length > 0 ? films : [];

    if (filmName !== '' && filmTime !== '') {
      newFilmsSearch = newFilmsSearch.filter(
        (film) =>
          (film.titleEn.toLowerCase().includes(filmName.toLowerCase()) ||
            film.titleVi.toLowerCase().includes(filmName.toLowerCase())) &&
          filmTime === getCurrentDate(new Date(film.releaseDate))
      );
      // return newFilmsSearch;
    }

    if (filmTime !== '' && filmName === '') {
      newFilmsSearch = newFilmsSearch.filter(
        (film) => filmTime === getCurrentDate(new Date(film.releaseDate))
      );
      // return newFilmsSearch;
    }

    if (filmName !== '' && filmTime === '') {
      newFilmsSearch = newFilmsSearch.filter(
        (film) =>
          film.titleEn.toLowerCase().includes(filmName.toLowerCase()) ||
          film.titleVi.toLowerCase().includes(filmName.toLowerCase())
      );
      // return newFilmsSearch;
    }

    console.log('this i newFilmsSearch', newFilmsSearch);
    // newFilmsSearch = newFilmsSearch
    //   .filter(
    //     (film) =>
    //       film.titleEn.toLowerCase().includes(filmName.toLowerCase()) ||
    //       film.titleVi.toLowerCase().includes(filmName.toLowerCase())
    //   )

    dispatch({
      type: 'SEARCH_FILM',
      payload: newFilmsSearch,
    });
  }, [films, filmName, filmTime, dispatch]);

  //// debounce search
  const debouncedValue = useDebounce(filmName);

  useEffect(() => {
    if (debouncedValue) {
      setFilmName(filmName);
    }
    // console.log('how many times: ',filmName)
  }, [debouncedValue]);
  console.log('how many: ', filmName);

  return (
    <>
      <div className='searchFilmForm'>
        <p className='searchFilmHeading'>Search film</p>

        <div className='wrapForm-Btn'>
          <form>
            <div className='form-group'>
              <label>Film's Name</label>
              <input
                type='text'
                className='form-control'
                id='filmName'
                name='filmName'
                value={filmName}
                onChange={onChangeForm}
                placeholder='Enter name of the film you want to find'
                required
              />
            </div>

            <div className='datePicker-control'>
              <label className='dataPickerLabel'>Date</label>
              <DatePicker
                className='datePickerFilm'
                defaultValue={moment(
                  `
                    ${pickerDefaultDate.getDate()}/
                    ${pickerDefaultDate.getMonth() + 1}/
                    ${pickerDefaultDate.getFullYear()}
                  `,
                  dateFormatList[0]
                )}
                format={`${dateFormatList[0]} HH:mm`}
                showTime={{ format: 'HH:mm' }}
                // onChange={onChange}
                onOk={onOk}
                placeholder='DD/MM/YYYY  HH:MM'
              />
            </div>
          </form>

          {(filmName || filmTime) && (
            <button className='btn btn-clear' onClick={clearSearch}>
              Clear
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchFilmForm;
