'use strict';

class AwsResource {
    constructor(resourceName) {
        this.setResourceName(resourceName);
    }
    /**
     * Configura o contexto para permitir que a lambda possa ser reiniciada caso dê timeout
     * @param context
     * @return {AwsResource}
     */
    setContext(context) {
        this.context = context;
        return this;
    }

    /**
     * Configura o nome do recurso: nome da lambda, nome da tabela do dynamo, nome do stream do kinesis, etc.
     * @param {string} resourceName O nome do recurso
     * @return {AwsResource}
     */
    setResourceName(resourceName) {
        this.resourceName = resourceName;
        return this;
    }

    /**
     * Configura uma função que será executada quando não houver mais itens a serem processados
     * @param {function} strictFinishFunction
     * @return {AwsResource}
     */
    setStrictFinishFunction(strictFinishFunction) {
        this._strictFinishFunction = strictFinishFunction;
        return this;
    }

    /**
     * Configura a função que será executada ao final de algumas ações
     * @param {function} finishFunction
     * @return {AwsResource}
     */
    setFinishFunction(finishFunction) {
        this._finishFunction = finishFunction;
        return this;
    }

    /**
     * Configura a função que será executada à cada iteração
     * @param {function} processFunction
     * @return {AwsResource}
     */
    setProcessFunction(processFunction) {
        this._processFunction = processFunction;
        return this;
    }
}

module.exports = AwsResource;
