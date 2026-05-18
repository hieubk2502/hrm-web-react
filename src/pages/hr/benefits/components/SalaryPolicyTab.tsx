import BudgetFilterForm from './BudgetFilterForm';
import BudgetToolbar from './BudgetToolbar';
import BudgetTable from './BudgetTable';
import {budgetDataSource} from '../data/mockData';

export default function SalaryPolicyTab() {
    return (
        <div>
            <BudgetFilterForm/>
            <BudgetToolbar/>
            <BudgetTable dataSource={budgetDataSource}/>
        </div>
    );
}
