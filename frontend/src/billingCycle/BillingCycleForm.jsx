import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LabeledInput from '../common/form/LabeledInput'
import { init } from './billingCycleActions'
import BillingList from './BillingList'
import Summary from './Summary'

class BillingCycleForm extends Component {

    getSummary() {
        const sum = (accumulator, current) => accumulator + current

        return {
            creditSum: this.props.credits.map(c => +c.value || 0).reduce(sum),
            debtSum: this.props.debts.map(c => +c.value || 0).reduce(sum)
        }
    }

    render() {
        const { handleSubmit, readOnly } = this.props
        const summary = this.getSummary()
        return (
            <form onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name="name" 
                        component={LabeledInput} 
                        label="Nome"
                        cols="12 4"
                        placeholder="Descrição do lançamento"
                        readOnly={readOnly} />
                    <Field name="month" 
                        component={LabeledInput} 
                        label="Mês"
                        cols="12 4"
                        placeholder="Mês do lançamento"
                        type="number" 
                        readOnly={readOnly} />
                    <Field name="year" 
                        component={LabeledInput} 
                        type="number"
                        label="Ano"
                        cols="12 4"
                        placeholder="Ano do lançamento"
                        readOnly={readOnly} />

                    <Summary credit={summary.creditSum} debt={summary.debtSum} />

                    <BillingList 
                        cols="12 6" 
                        readOnly={readOnly} 
                        itens={this.props.credits} 
                        field="credits"
                        legend="Créditos"/>

                    <BillingList 
                        showStatus={true}
                        cols="12 6" 
                        readOnly={readOnly} 
                        itens={this.props.debts} 
                        field="debts"
                        legend="Débitos"/>
                </div>
                <div className="box-footer">
                    <button type="submit" className={`btn btn-${this.props.submitButtonClass}`}>
                        {this.props.submitButtonCaption}
                    </button>
                    <button type="button" className="btn btn-default" onClick={this.props.init}>
                        Cancelar
                    </button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({ form: "billingCycleForm", destroyOnUnmount: false })(BillingCycleForm)

const formSelector = formValueSelector("billingCycleForm")
const mapStateToProps = state => ({ 
    credits: formSelector(state, 'credits'),
    debts: formSelector(state, 'debts')
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)