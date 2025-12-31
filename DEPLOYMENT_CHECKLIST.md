# Deployment Checklist

Complete this checklist before deploying to production.

## Pre-Deployment

### Code Quality
- [ ] No console errors in browser
- [ ] No ESLint warnings
- [ ] All components render correctly
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] All routes work correctly
- [ ] No TypeScript/JavaScript errors

### Dependencies
- [ ] `npm install` runs without errors
- [ ] All dependencies are latest stable versions
- [ ] No unused dependencies in package.json
- [ ] PayPal SDK installed: `@paypal/react-paypal-js`

### Environment Configuration
- [ ] `.env` file created with all variables
- [ ] Supabase URL is correct
- [ ] Supabase anon key is correct
- [ ] PayPal Client ID configured
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists for reference

### Database Setup
- [ ] Supabase project created
- [ ] `database-setup.sql` executed successfully
- [ ] All 4 tables created: profiles, products, orders, order_items
- [ ] RLS policies enabled and working
- [ ] Database triggers created
- [ ] Indexes created for performance
- [ ] Sample data inserted (optional)

### Storage Setup
- [ ] `product_img` bucket created
- [ ] Bucket is set to public
- [ ] Upload policies configured
- [ ] Test image upload works

### Authentication Setup
- [ ] Email provider enabled in Supabase
- [ ] Google OAuth configured (optional)
- [ ] Redirect URLs configured
- [ ] Password reset flow tested
- [ ] Sign up flow tested
- [ ] Sign in flow tested

### User Roles
- [ ] At least one admin user created
- [ ] Admin role verified in profiles table
- [ ] Admin can access admin routes
- [ ] Regular user cannot access admin routes
- [ ] Role-based routing works correctly

## Feature Testing

### User Panel
- [ ] Sign up works
- [ ] Sign in works
- [ ] Sign out works
- [ ] Product list displays correctly
- [ ] Product detail page loads
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Remove from cart works
- [ ] Quantity update works
- [ ] Cart persists after refresh
- [ ] Checkout page loads
- [ ] PayPal payment flow works (Sandbox)
- [ ] COD order placement works
- [ ] Order confirmation displays
- [ ] Orders appear in user dashboard
- [ ] User dashboard loads correctly

### Admin Panel
- [ ] Admin login redirects to admin dashboard
- [ ] Dashboard statistics display correctly
- [ ] Add product works
- [ ] Product image upload works
- [ ] Product list displays in admin
- [ ] Edit product works
- [ ] Delete product works
- [ ] Orders list displays
- [ ] Order details show correctly
- [ ] Order status update works
- [ ] Admin sidebar navigation works
- [ ] Admin navbar logout works

### Security
- [ ] Unauthenticated users redirected to signin
- [ ] Users cannot access admin routes
- [ ] Admins can access all routes
- [ ] RLS policies prevent unauthorized data access
- [ ] Session persists correctly
- [ ] Logout clears session

## Build & Deploy

### Build Process
- [ ] `npm run build` completes without errors
- [ ] Build output is in `dist/` folder
- [ ] Build size is reasonable (< 2MB recommended)
- [ ] No build warnings

### Deployment Platform
Choose one:

#### Vercel
- [ ] Vercel account created
- [ ] Project imported from Git
- [ ] Environment variables added
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Deploy triggered
- [ ] Deployment successful
- [ ] Custom domain configured (optional)

#### Netlify
- [ ] Netlify account created
- [ ] Site created from Git repo
- [ ] Environment variables added
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Deploy triggered
- [ ] Deployment successful
- [ ] Custom domain configured (optional)

### Post-Deployment

#### Production Environment
- [ ] Update PayPal to Live credentials (not Sandbox)
- [ ] Test payment with real PayPal account
- [ ] Verify email notifications work
- [ ] Test on multiple devices
- [ ] Test on multiple browsers
- [ ] Performance audit passed (Lighthouse)
- [ ] Accessibility audit passed

#### Monitoring
- [ ] Error tracking set up (optional)
- [ ] Analytics configured (optional)
- [ ] Uptime monitoring configured (optional)

## Security Review

### Environment Variables
- [ ] All secrets in environment variables, not code
- [ ] `.env` not committed to Git
- [ ] Production environment variables set in hosting platform
- [ ] Keys rotated if exposed

### Database Security
- [ ] RLS policies tested and working
- [ ] No direct SQL in frontend code
- [ ] All queries use Supabase client
- [ ] Foreign key constraints in place
- [ ] Check constraints for data validation

### Authentication Security
- [ ] Password requirements enforced
- [ ] Email verification enabled (optional)
- [ ] OAuth redirect URLs whitelisted
- [ ] JWT tokens expire correctly
- [ ] Session timeout configured

### API Security
- [ ] Supabase anon key is public (safe)
- [ ] Service role key NOT exposed
- [ ] CORS configured correctly
- [ ] Rate limiting considered

## Performance Optimization

### Frontend
- [ ] Images optimized (compressed, correct format)
- [ ] Lazy loading implemented where possible
- [ ] Code splitting considered
- [ ] Unused code removed
- [ ] CSS optimized with Tailwind purge

### Backend
- [ ] Database indexes created
- [ ] Queries optimized
- [ ] N+1 queries avoided
- [ ] Caching strategy considered

## Documentation

- [ ] README.md updated
- [ ] Setup guide available (SETUP_GUIDE.md)
- [ ] Architecture documented (ARCHITECTURE.md)
- [ ] Environment variables documented (.env.example)
- [ ] Database schema documented (database-setup.sql)
- [ ] API endpoints documented (if any)

## User Acceptance Testing

### Admin User Testing
- [ ] Admin can manage products
- [ ] Admin can view all orders
- [ ] Admin can update order status
- [ ] Admin dashboard shows accurate data
- [ ] Admin cannot be locked out

### Regular User Testing
- [ ] User can browse products
- [ ] User can add items to cart
- [ ] User can complete checkout
- [ ] User can view order history
- [ ] Cart persists across sessions

### Edge Cases
- [ ] Empty cart displays correctly
- [ ] No products displays correctly
- [ ] No orders displays correctly
- [ ] Out of stock products handled
- [ ] Failed payment handled gracefully
- [ ] Slow network conditions tested

## Go-Live

### Final Checks
- [ ] All checklist items completed
- [ ] Team approval obtained
- [ ] Backup plan ready
- [ ] Rollback procedure documented
- [ ] Support contacts ready

### Launch
- [ ] Production deploy triggered
- [ ] Smoke tests passed
- [ ] User accounts tested
- [ ] Payment flow verified
- [ ] Admin functions verified

### Post-Launch
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Verify email notifications
- [ ] Test critical user flows
- [ ] Document any issues

## Maintenance

### Regular Tasks
- [ ] Monitor Supabase usage/quotas
- [ ] Review error logs weekly
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Review and rotate API keys quarterly

### Future Enhancements
- [ ] Collect user feedback
- [ ] Plan feature roadmap
- [ ] Optimize based on metrics
- [ ] Scale infrastructure as needed

---

## Notes

**Critical Items** (must be done):
- Environment variables configured
- Database setup complete
- RLS policies enabled
- Admin user created
- Build and deploy successful

**Recommended Items**:
- Performance optimization
- Comprehensive testing
- Documentation complete
- Monitoring setup

**Optional Items**:
- Custom domain
- Email notifications
- Advanced analytics
- Error tracking service

---

**Deployment Date:** _________________

**Deployed By:** _________________

**Production URL:** _________________

**Status:** ⬜ In Progress  ⬜ Ready  ✅ Deployed

