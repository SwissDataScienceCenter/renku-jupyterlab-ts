FROM node:alpine
COPY . /srv
WORKDIR /srv
RUN npm install && npm run build && npm pack

FROM renku/singleuser:latest
COPY --from=0 /srv/renku-renku-jupyterlab-ts-*.tgz /home/$NB_USER/
RUN jupyter labextension uninstall renku-jupyterlab-ts && \
    pip install -U jupyterlab papermill && \
    jupyter labextension install --debug /home/$NB_USER/renku-renku-jupyterlab-ts-*.tgz
