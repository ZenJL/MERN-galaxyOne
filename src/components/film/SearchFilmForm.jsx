import { useState } from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

//// Context
import { useGalaxyFilmContext } from '../../context/galaxyFilmContext';

const dateFormatList = ['DD/MM/YYYY'];

//// 2 functions for date picker
function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

function SearchFilmForm({ films }) {
  const [filmName, setFilmName] = useState('');

  // const { films } = useGalaxyFilmContext();

  const pickerDefaultDate = new Date();

  const onChangeForm = (e) => {};

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
                onChange={onChange}
                onOk={onOk}
                placeholder='DD/MM/YYYY  HH:MM'
              />
            </div>
          </form>

          {films.length > 0 && <button className='btn btn-clear'>Clear</button>}
        </div>
      </div>
    </>
  );
}

export default SearchFilmForm;
