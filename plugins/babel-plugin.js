module.exports = function (babel) {
    return {
        visitor: {
            CallExpression: {
                enter: function (path) {
                    const callee = path.get('callee');
                    if (callee.matchesPattern('console.log')) {
                        path.remove();
                    }
                }
            }
        }
    };
};