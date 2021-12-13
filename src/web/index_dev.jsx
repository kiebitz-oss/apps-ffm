// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { render } from './index_common';

render();

if (module.hot) {
    module.hot.accept(() => {
        render();
    });
}
