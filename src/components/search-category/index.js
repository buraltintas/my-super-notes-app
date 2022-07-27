import { useContext } from 'react';
import { appContext } from '../../context';
import styles from './SearchCategory.module.css';

const SearchCategory = () => {
  const {
    searchText,
    setSearchText,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
  } = useContext(appContext);

  return (
    <div className={styles.searchCategoryContainer}>
      <input
        type='text'
        placeholder='Search in note text'
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <div>
        <label htmlFor='category'>Filter by category</label>
        <select
          id='category'
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
        >
          <option value='' key='all'>
            all
          </option>
          <option value='todo' key='todo'>
            todo
          </option>
          <option value='bug' key='bug'>
            bug
          </option>
          <option value='private' key='private'>
            private
          </option>
          <option value='just for fun' key='just for fun'>
            just for fun
          </option>
          <option value='education' key='education'>
            education
          </option>
          <option value='travel notes' key='travel notes'>
            travel notes
          </option>
          <option value='checklist' key='checklist'>
            checklist
          </option>
          <option value='planning' key='planning'>
            planning
          </option>
          <option value='meeting notes' key='meeting notes'>
            meeting notes
          </option>
          <option value='other' key='other'>
            other
          </option>
        </select>
      </div>
      <div>
        <label htmlFor='status'>Show</label>
        <select
          id='status'
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
        >
          <option value='' key='all'>
            all
          </option>
          <option value={true} key='done'>
            done
          </option>
          <option value={false} key='undone'>
            undone
          </option>
        </select>
      </div>
    </div>
  );
};

export default SearchCategory;
