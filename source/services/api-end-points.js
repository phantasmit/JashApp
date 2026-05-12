//const BASE_URL = "http://13.59.59.23:8099"
import { store } from "../store/configureStore";


export const BASE_URL_DATA = () => {
    return "https://jashsuits.com";
}
const BASE_URL = () => {

    // const stackReducer = store.getState().StackReducer
    // const { base_url = '' } = stackReducer;

    // return base_url

    //return "http://122.170.115.173:10077"
    //return "http://113.20.19.105:8069"
    //return "http://122.170.115.173:10082"
    //return "https://e66e-103-210-37-40.ngrok-free.app"
    return "https://jashsuits.com";

}
//Image URL
export const IMAGE_URL = () => `${BASE_URL()}`;
//LOGIN API
export const LOGIN_API = () => `${BASE_URL()}/web/session/authenticate`;
//User Process API
export const USER_PROCESS_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//JOB FORM API
export const JOB_FORM_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//Compute Allocation
export const COMPUTE_ALLOCATION_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//Find Line ID
export const GET_LINE_ID_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//QUANTITY UPDATE
export const QTY_UPDATE_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//UPDATE STATE API - Ready to issue
export const READY_TO_ISSUE_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//UPDATE STATE API - Ready to issue
export const UPDATE_STATE_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//FG Receive Data API
export const FG_RECEIVE_DATA_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//Job List Data API
//export const JOB_LIST_DATA_API_OLD = () => `${BASE_URL()}/web/dataset/call_kw`;
export const JOB_LIST_DATA_API = () => `${BASE_URL()}/web/dataset/call_kw/jobber.plan.detail/web_search_read`;
//Plan List Data API
export const PLAN_LIST_DATA_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//Jobber Assign API
export const SUBMIT_JOBBER_ASSIGNER_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//QA Product List API
export const QA_PRODUCT_LIST_DATA_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//QC Check API List 
export const QA_CHECK_DATA_API = () => `${BASE_URL()}/web/dataset/call_kw/order.receive/web_save`;
//Product API List 
export const PRODUCT_DATA_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//Thread Data API 
export const THREAD_DATA_API = () => `${BASE_URL()}/mail/thread/data`;
//CUSTOMER PORTAL API
export const CUSTOMER_PORTAL_API = () => `${BASE_URL()}/web/dataset/call_kw`;
//CUSTOMER PORTAL  Detail API
export const CUSTOMER_PORTAL_DETAIL_API = () => `${BASE_URL()}/web/dataset/call_kw`;