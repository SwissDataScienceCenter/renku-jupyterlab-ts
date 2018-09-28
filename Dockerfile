FROM node:alpine
COPY . /srv
WORKDIR /srv
RUN npm install && npm run build && npm pack

FROM renku/singleuser:latest
COPY --from=0 /srv/renku-jupyterlab-ts-*.tgz /home/$NB_USER/
RUN pip install -U jupyterlab papermill && \
    jupyter labextension install --debug /home/$NB_USER/renku-jupyterlab-ts-*.tgz
