import SideBar from '../components/SideBar'
import KanbanBoard from '../components/Kanbanboard.jsx';
function kanban() {
  return (
    <div>
        <div className='flex justify-between mt-10 pr-3'>
        <SideBar/>
        <KanbanBoard/>
        </div>
        
    </div>
  )
}

export default kanban