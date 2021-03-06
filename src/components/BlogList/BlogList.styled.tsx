import styled from '@emotion/styled'
import { breakpoint } from '../styling/styling-utils/breakpoints'
import { calcRem } from '../styling/styling-utils/calcRem'

export const StyledBlogList = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: calcRem(10),

    [breakpoint('sm')]: {
        gridTemplateColumns: '1fr 1fr',
    },

    [breakpoint('lg')]: {
        gridTemplateColumns: '1fr 1fr 1fr',
    },
})
