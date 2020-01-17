export default [
    [ 'core/heading', {
        placeholder:  'Heading 2',
        level: 2
    }],
    [ 'core/paragraph', {
        placeholder:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus in libero feugiat pulvinar'
    }],
    [ 'core/columns', {
        'columns': 3
    }, [
        [ 'core/column', [], [
            [ 'core/image'],
            [ 'core/heading', {
                placeholder:  'Heading 3',
                level: 3
            }],
            [ 'core/paragraph', {
                placeholder:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus in libero.'
            }],            
        ] ],
        [ 'core/column', [], [
            [ 'core/image'],
            [ 'core/heading', {
                placeholder:  'Heading 3',
                level: 3
            }],
            [ 'core/paragraph', {
                placeholder:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus in libero.'
            }],            
        ] ],
        [ 'core/column', [], [
            [ 'core/image'],
            [ 'core/heading', {
                placeholder:  'Heading 3',
                level: 3
            }],
            [ 'core/paragraph', {
                placeholder:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus in libero.'
            }],            
        ] ],
    ] ]  
];



