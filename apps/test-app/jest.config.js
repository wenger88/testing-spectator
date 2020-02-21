module.exports = {
  name: 'test-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/test-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
