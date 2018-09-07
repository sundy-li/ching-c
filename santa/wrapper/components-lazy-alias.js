export default {
  Row: $import => {
    return $import(["Grid"]).then(() => {
      return import(/* webpackChunkName: "Row" */
      /* webpackMode: "lazy" */
      "./components/Row/index").then(module => {
        return module
      })
    })
  },
  DtuxNav: $import => {
    return $import(["Nav"]).then(() => {
      return import(/* webpackChunkName: "DtuxNav" */
      /* webpackMode: "lazy" */
      "./components/DtuxNav/index").then(module => {
        return module
      })
    })
  },
  DtuxFooter: $import => {
    return $import(["Nav"]).then(() => {
      return import(/* webpackChunkName: "DtuxFooter" */
      /* webpackMode: "lazy" */
      "./components/DtuxFooter/index").then(module => {
        return module
      })
    })
  },
  DtuxSection: $import => {
    return $import([]).then(() => {
      return import(/* webpackChunkName: "DtuxSection" */
      /* webpackMode: "lazy" */
      "./components/DtuxSection/index").then(module => {
        return module
      })
    })
  },
  DtuxBreadcrumb: $import => {
    return $import(["Icon", "Breadcrumb"]).then(() => {
      return import(/* webpackChunkName: "DtuxBreadcrumb" */
      /* webpackMode: "lazy" */
      "./components/DtuxBreadcrumb/index").then(module => {
        return module
      })
    })
  },
  DtuxSlider: $import => {
    return $import(["Slider"]).then(() => {
      return import(/* webpackChunkName: "DtuxSlider" */
      /* webpackMode: "lazy" */
      "./components/DtuxSlider/index").then(module => {
        return module
      })
    })
  },
  DtuxBlockView: $import => {
    return $import(["Breadcrumb"]).then(() => {
      return import(/* webpackChunkName: "DtuxBlockView" */
      /* webpackMode: "lazy" */
      "./components/DtuxBlockView/index").then(module => {
        return module
      })
    })
  },
  DtuxForm: $import => {
    return $import([
      "Button",
      "Form",
      "Field",
      "Input",
      "DatePicker",
      "TimePicker",
      "Select",
      "Radio",
      "Checkbox"
    ]).then(() => {
      return import(/* webpackChunkName: "DtuxForm" */
      /* webpackMode: "lazy" */
      "./components/DtuxForm/index").then(module => {
        return module
      })
    })
  },
  DtuxList: $import => {
    return $import(["Button", "Icon", "Table", "Pagination"]).then(() => {
      return import(/* webpackChunkName: "DtuxList" */
      /* webpackMode: "lazy" */
      "./components/DtuxList/index").then(module => {
        return module
      })
    })
  },
  DtuxDialog: $import => {
    return $import(["Button", "Dialog"]).then(() => {
      return import(/* webpackChunkName: "DtuxDialog" */
      /* webpackMode: "lazy" */
      "./components/DtuxDialog/index").then(module => {
        return module
      })
    })
  },
  DtuxSearch: $import => {
    return $import(["Search"]).then(() => {
      return import(/* webpackChunkName: "DtuxSearch" */
      /* webpackMode: "lazy" */
      "./components/DtuxSearch/index").then(module => {
        return module
      })
    })
  },
  DtuxSearchForm: $import => {
    return $import([
      "Button",
      "Form",
      "Field",
      "Input",
      "DatePicker",
      "TimePicker",
      "Select",
      "Radio",
      "Checkbox"
    ]).then(() => {
      return import(/* webpackChunkName: "DtuxSearchForm" */
      /* webpackMode: "lazy" */
      "./components/DtuxSearchForm/index").then(module => {
        return module
      })
    })
  }
}
