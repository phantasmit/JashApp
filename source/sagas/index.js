import { all } from 'redux-saga/effects';
import { navigationSaga } from '../navigation/saga';
import { loginSaga } from '../screens/login/saga';
import { scanSaga } from '../screens/scan/saga';
import { jobFormSaga } from '../apps/jobber/screens/jobForm/saga';
import { jobberSaga } from '../apps/jobber/utils/saga';
import { jobListSaga } from '../apps/jobber/screens/jobList/saga';
import { planListSaga } from '../apps/jobber/screens/planList/saga';
import { QAProductSaga } from '../apps/qa/productList/saga';
import { ProductDataSaga } from '../apps/product/saga';
import { CustomerPortalSaga } from '../apps/customerPortal/saga';

export function* rootSaga() {
    yield all([
        //Navigation Saga
        navigationSaga(),
        //Login Saga
        loginSaga(),
        //Scan Saga
        scanSaga(),
        //Job Saga
        jobFormSaga(),
        //Jobber Saga
        jobberSaga(),
        //Job List Saga
        jobListSaga(),
        //Plan List Saga
        planListSaga(),
        //QA List Saga
        QAProductSaga(),
        //Prodct Saga
        ProductDataSaga(),
        //Customer Portal Saga
        CustomerPortalSaga()
    ]);
}