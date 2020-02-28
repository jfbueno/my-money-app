import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/ContentHeader'
import Content from '../common/template/Content' 

import TabCollectionContainer from '../common/tab/TabCollectionContainer'
import TabCollectionHeader from '../common/tab/TabCollectionHeader'
import TabCollection from '../common/tab/TabCollection'
import TabHeader from '../common/tab/TabHeader'
import TabContent from '../common/tab/TabContent'

import BillingCycleList from './BillingCycleList'
import Form from './BillingCycleForm'

import { init, create, update, remove } from './billingCycleActions'

class BillingCycle extends Component {
    componentWillMount() {
        this.props.initForm ()
    }

    render() {
        return (
            <div>
                <ContentHeader title="Ciclos de Pagamentos" subtitle="Cadastro" />
                <Content>
                    <TabCollectionContainer>
                        <TabCollectionHeader>
                            <TabHeader label="Listar" icon="bars" target="tabList" />
                            <TabHeader label="Incluir" icon="plus" target="tabCreate" />
                            <TabHeader label="Editar" icon="pencil" target="tabUpdate" />
                            <TabHeader label="Deletar" icon="trash-o" target="tabDelete" />
                        </TabCollectionHeader>
                        <TabCollection>
                            <TabContent id="tabList">
                                <BillingCycleList />
                            </TabContent>
                            <TabContent id="tabCreate">
                                <Form onSubmit={this.props.create} submitButtonClass="primary" submitButtonCaption="Incluir" />
                            </TabContent>
                            <TabContent id="tabUpdate">
                                <Form onSubmit={this.props.update} submitButtonClass="info" submitButtonCaption="Alterar"  />
                            </TabContent>
                            <TabContent id="tabDelete">
                                <Form onSubmit={this.props.remove} readOnly={true} submitButtonClass="danger" submitButtonCaption="Excluir" />
                            </TabContent>
                        </TabCollection>
                    </TabCollectionContainer>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ create, update, remove, initForm: init }, dispatch)
export default connect(null, mapDispatchToProps)(BillingCycle)