import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = "http://localhost:3003/api/billing-cycles"
const FORM_INITIAL_VALUES = {
    credits: [{}],
    debts: [{}],
    summary: {}
}

export function getList() {
    const request = axios.get(BASE_URL)
    return {
        type: "BILLING_CYCLES_FETCHED",
        payload: request
    }
}

export function create(values) {
    const request = axios.post(BASE_URL, values)
    return _submitForm(request)
}

export function update(values) {
    const request = axios.put(`${BASE_URL}/${values._id}`, values)
    return _submitForm(request)
}

export function remove(values) {
    const request = axios.delete(`${BASE_URL}/${values._id}`)
    return _submitForm(request)
}

export function showToUpdate(billingCycle) {
    return [
        showTabs("tabUpdate"),
        selectTab("tabUpdate"),
        initialize("billingCycleForm", billingCycle)
    ]
}

// TODO: Provavelmente poderia reusar o método acima
export function showToDelete(billingCycle) {
    return [
        showTabs("tabDelete"),
        selectTab("tabDelete"),
        initialize("billingCycleForm", billingCycle)
    ]
}

export function init() {
    return [
        showTabs("tabList", "tabCreate"),
        selectTab("tabList"),
        getList(),
        initialize("billingCycleForm", FORM_INITIAL_VALUES)
    ]
}

function _submitForm(request) {
    return dispatch => {
        request.then(r => {
            toastr.success("Sucesso", "Registro salvo")
            dispatch(init())
        }).catch(e => {
            e.response.data.errors.forEach(error => toastr.error("Problema", error))
        })
    }
}