import { Link } from 'react-router-dom'
import { getCategories } from '../services/dataService'
import './Home.css'

function Home() {
  const categories = getCategories()

  return (
    <div className="home">
      <h1>Jurus</h1>
      <table className="categories-table">
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>
                <Link to={`/categoria/${category.id}`} className="category-link">
                  {category.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home