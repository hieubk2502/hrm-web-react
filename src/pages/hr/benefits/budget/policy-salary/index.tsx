import BudgetFilterForm from './components/BudgetFilterForm';
import BudgetToolbar from './components/BudgetToolbar';
import BudgetTable from './components/BudgetTable';
import {budgetDataSource} from './data/mockData';

export default function SalaryPolicyTab() {
    return (
        <div>
            <BudgetFilterForm/>
            <BudgetToolbar/>
            <BudgetTable dataSource={budgetDataSource}/>
        </div>
    );
}
