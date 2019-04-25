const getters = {
    app_routes: state => state.app.routes,
    sidebar: state => state.app.sidebar,
    visitedViews: state => state.tagsView.visitedViews,
    common: state => state.common,
}
export default getters
