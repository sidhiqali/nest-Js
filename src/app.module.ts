import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';


@Module({
  imports: [UserModule, AuthModule, BookmarksModule],
})
export class AppModule { }
