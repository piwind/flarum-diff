import app from 'flarum/common/app';
import DiffSettingsPage from './DiffSettingsPage';

app.initializers.add('piwind-diff', (app) => {
  app.extensionData
    .for('piwind-diff')
    .registerPage(DiffSettingsPage)
    .registerPermission(
      {
        // who can view edit history?
        icon: 'fas fa-history',
        label: app.translator.trans('piwind-diff.admin.permissions.viewEditHistory'),
        permission: 'viewEditHistory',
        allowGuest: false,
      },
      'view'
    )
    .registerPermission(
      {
        // who can delete others edit history?
        icon: 'fas fa-times',
        label: app.translator.trans('piwind-diff.admin.permissions.deleteEditHistory'),
        permission: 'deleteEditHistory',
        allowGuest: false,
      },
      'moderate'
    )
    .registerPermission(
      {
        // who can delete their own edit history?
        icon: 'fas fa-times',
        label: app.translator.trans('piwind-diff.admin.permissions.selfDeleteEditHistory'),
        permission: 'selfDeleteEditHistory',
        allowGuest: false,
      },
      'moderate'
    )
    .registerPermission(
      {
        // who can rollback others edit history?
        icon: 'fas fa-history',
        label: app.translator.trans('piwind-diff.admin.permissions.rollbackEditHistory'),
        permission: 'rollbackEditHistory',
        allowGuest: false,
      },
      'moderate'
    )
    .registerPermission(
      {
        // who can rollback their own edit history?
        icon: 'fas fa-history',
        label: app.translator.trans('piwind-diff.admin.permissions.selfRollbackEditHistory'),
        permission: 'selfRollbackEditHistory',
        allowGuest: false,
      },
      'moderate'
    );
});
