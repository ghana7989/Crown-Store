import React from 'react';

import * as alias from './with-spinner.styles'

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <alias.SpinnerOverlay>
            <alias.SpinnerContainer />
        </alias.SpinnerOverlay>
    )
        :
        <WrappedComponent {...otherProps} />
}
export default WithSpinner;