import React, { Component } from 'react'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Grid from '../common/layout/Grid'
import Input from '../common/form/Input'
import If from '../common/operator/If'

class BillingList extends Component {
    add(index, item = {}) {
        if(this.props.readOnly) return

        this.props.arrayInsert("billingCycleForm", this.props.field, index, item)
    }

    remove(index) {
        if(this.props.readOnly || this.props.itens.length === 1) return

        this.props.arrayRemove("billingCycleForm", this.props.field, index)
    }

    renderRows() {
        const itens = this.props.itens || []
        return itens.map((item, index) => (
            <tr key={index}>
                <td>
                    <Field 
                        name={`${this.props.field}[${index}].name` }
                        component={Input} 
                        placeholder="Nome do lançamento"
                        readOnly={this.props.readOnly} />
                </td>
                <td>
                    <Field 
                        name={`${this.props.field}[${index}].value` }
                        component={Input} 
                        placeholder="Valor do lançamento"
                        readOnly={this.props.readOnly}
                        type="number" />
                </td>
                <If condition={this.props.showStatus} >
                    <td>
                        <Field 
                            name={`${this.props.field}[${index}].status` }
                            component={Input} 
                            placeholder="Status do Lançamento"
                            readOnly={this.props.readOnly} />
                    </td>
                </If>
                <td>
                    <button type="button" className="btn btn-success" onClick={() => this.add(index + 1)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button type="button" className="btn btn-warning" onClick={() => this.add(index + 1, item)}>
                        <i className="fa fa-clone"></i>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => this.remove(index)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>{this.props.legend}</fieldset>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            {/* Acho que o componente deveria ter um enum dizendo se crédito ou débito e usar isso aqui */}
                            <If condition={this.props.showStatus} >
                                <th>Status</th>
                            </If>
                            <th className="table-actions">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatchEvent => bindActionCreators( { arrayInsert, arrayRemove }, dispatchEvent)

export default connect(null, mapDispatchToProps)(BillingList)