'use strict';

const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate;
const handlebars = require('handlebars');
const layouts = require('handlebars-layouts');
const InternalException = require('../Exceptions/InternalException');
const mailConfig = require('../configs/mail');
const appConfig = require('../configs/app');
const I18n = require('./I18n/I18n');
const BbPromise = require('bluebird');

const emailTemplateDirectory = path.join(__dirname, '..', '..', 'assets', 'templates', 'email');

let instance = false;
class Email {
    static getInstance() {
        if (!instance) {
            instance = new Email();
        }
        return instance;
    }

    constructor() {
        this.i18n = I18n.getInstance();
        this.configure();
    }

    configure() {
        handlebars.registerHelper('translate', (key, data) => {
            return this.i18n.translate(key, data);
        });

        handlebars.registerPartial('email-html-layout', fs.readFileSync(path.join(emailTemplateDirectory, 'layout', 'html', 'layout.hbs'), 'utf8'));
        handlebars.registerPartial('email-html-header', fs.readFileSync(path.join(emailTemplateDirectory, 'layout', 'html', 'header.hbs'), 'utf8'));
        handlebars.registerPartial('email-html-footer', fs.readFileSync(path.join(emailTemplateDirectory, 'layout', 'html', 'footer.hbs'), 'utf8'));
        handlebars.registerPartial('email-text-layout', fs.readFileSync(path.join(emailTemplateDirectory, 'layout', 'text', 'layout.hbs'), 'utf8'));
        handlebars.registerPartial('email-text-header', fs.readFileSync(path.join(emailTemplateDirectory, 'layout', 'text', 'header.hbs'), 'utf8'));
        handlebars.registerPartial('email-text-footer', fs.readFileSync(path.join(emailTemplateDirectory, 'layout', 'text', 'footer.hbs'), 'utf8'));
        layouts.register(handlebars);

        this.transporter = nodemailer.createTransport(mailConfig.transport);
    }

    /*
    * Campos do options:
    *   - data
    *   - template
    *   - email
    *   - language
    *   - attachments - array com caminho para arquivos (fileSystem ou URL) - https://nodemailer.com/using-attachments/
    * */
    // TODO - adicionar retentativas ?
    sendEmail({ data, template, email, attachments = [] } = {}) {
        const emailTemplate = new EmailTemplate(path.join(emailTemplateDirectory, template));

        const promise = new BbPromise((resolve, reject) => {
            emailTemplate.render(data, (err, result) => {
                if (err) {
                    reject(new InternalException(
                        `Failed to render template ${template}`,
                        err
                    ));
                    return;
                }
                resolve(result);
            });
        });

        return promise
            .then((result) => {
                const emailContent = {
                    from: `"${appConfig.name}" <${mailConfig.from}>`,
                    to: email,
                    subject: `${result.subject} - ${appConfig.domain}`,
                    text: result.text,
                    html: result.html,
                };

                if (attachments.length) {
                    emailContent.attachments = attachments;
                }

                return new BbPromise((resolve, reject) => {
                    this.transporter.sendMail(emailContent, (emailErr, info) => {
                        if (emailErr) {
                            reject(new InternalException(
                                'Failed to send email.',
                                email,
                                emailErr
                            ));
                            return;
                        }
                        resolve(info);
                    });
                });
            });
    }
}

module.exports = Email;

