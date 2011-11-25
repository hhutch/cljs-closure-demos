(ns datepicker
  (:require
    [goog.dom :as dom]
    [goog.date :as goog-date]
    [goog.i18n.DateTimeSymbols :as goog-dt]
    [goog.i18n.DateTimeSymbols_en_ISO :as goog-dt-iso]
    [goog.i18n.DateTimeSymbols_en_US :as goog-dt-us]
    [goog.i18n.DateTimeSymbols_de :as goog-dt-de]
    [goog.i18n.DateTimeSymbols_ml :as goog-dt-ml]
    [goog.i18n.DateTimeSymbols_ar_YE :as goog-dt-ye]
    [goog.ui.DatePicker :as goog-picker]))

(defn ^:export setup []
  (let [dp-iso-8601 (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_en_ISO)
        dp-custom (goog.ui.DatePicker. (goog.date.Date. 2006 0 1))
        dp-en-US (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_en_US)
        dp-de (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_de)
        dp-ml (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_ml)
        dp-ar-YE (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_ar_YE)]
    ;; ## Standard: ISO 8601
    (. dp-iso-8601 (render (dom/getElement "widget_iso_8601")))
    (.listen goog.events dp-iso-8601
                         (.. goog.ui.DatePicker Events CHANGE)
                         (fn [event]
                           (. goog.dom (setTextContent (dom/getElement "label_iso_8601"))
                                                       (if (.date event)
                                                           (.. event date (toIsoString true)) 
                                                           "none"))))
    (. goog.dom (setTextContent (dom/getElement "label_iso_8601")
                                (.. dp-iso-8601 (getDate) (toIsoString true))))
    ;; ## Custom
    (. dp-custom (render (dom/getElement "widget_custom")))
    (.listen goog.events dp-custom
                         (.. goog.ui.DatePicker Events CHANGE)
                         (fn [event]
                           (. goog.dom (setTextContent (dom/getElement "label_custom"))
                                                       (if (.date event)
                                                           (.. event date (toIsoString true)) 
                                                           "none"))))
    (. goog.dom (setTextContent (dom/getElement "label_custom")
                                (.. dp-iso-8601 (getDate) (toIsoString true))))
    ;; ## English (US)
    (. dp-en-US (render (dom/getElement "widget_en_US")))
    (.listen goog.events dp-en-US
                         (.. goog.ui.DatePicker Events CHANGE)
                         (fn [event]
                           (. goog.dom (setTextContent (dom/getElement "label_en_US"))
                                                       (if (.date event)
                                                           (.. event date (toIsoString true))
                                                           "none"))))
    (. goog.dom (setTextContent (dom/getElement "label_en_US")
                                (.. dp-en-US (getDate) (toIsoString true))))
    ;; ## German 
    (. dp-de (render (dom/getElement "widget_de")))
    (.listen goog.events dp-de
                         (.. goog.ui.DatePicker Events CHANGE)
                         (fn [event]
                           (. goog.dom (setTextContent (dom/getElement "label_de"))
                                                       (if (.date event)
                                                           (.. event date (toIsoString true))
                                                           "none"))))
    (. goog.dom (setTextContent (dom/getElement "label_de")
                                (.. dp-de (getDate) (toIsoString true))))
    ;; ## Malayalam
    (. dp-ml (render (dom/getElement "widget_ml")))
    (.listen goog.events dp-ml
                         (.. goog.ui.DatePicker Events CHANGE)
                         (fn [event]
                           (. goog.dom (setTextContent (dom/getElement "label_ml"))
                                                       (if (.date event)
                                                           (.. event date (toIsoString true))
                                                           "none"))))
    (. goog.dom (setTextContent (dom/getElement "label_ml")
                                (.. dp-ml (getDate) (toIsoString true))))
    ;; ## Arabic (Yemen)
    (. dp-ar-YE (render (dom/getElement "widget_ar_YE")))
    (.listen goog.events dp-ar-YE
                         (.. goog.ui.DatePicker Events CHANGE)
                         (fn [event]
                           (. goog.dom (setTextContent (dom/getElement "label_ar_YE"))
                                                       (if (.date event)
                                                           (.. event date (toIsoString true))
                                                           "none"))))
    (. goog.dom (setTextContent (dom/getElement "label_ar_YE")
                                (.. dp-ar-YE (getDate) (toIsoString true)))) ))
