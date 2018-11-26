/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./ojet-popup-errorservice-view.html', './ojet-popup-errorservice-viewModel', 'text!./component.json', 'css!./ojet-popup-errorservice-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('ojet-popup-errorservice', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);