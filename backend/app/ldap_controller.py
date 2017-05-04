#!/usr/bin/env python
# -*- coding: utf-8 -*-

import ldap
from exceptions import CustomServerFailed, CustomAuthenticationFailed
import settings

class LdapController(object):

    def __init__(self):
        # Basic settings
        self.scope = ldap.SCOPE_SUBTREE
        self.base = settings.base
        self.lfilter = settings.lfilter
        self.retrieve_attributes = ['cn', 'uid', 'mail']
        self.ldap_server = settings.ldap_server
    
    def connect(self):
        try:
            ldap.set_option(ldap.OPT_X_TLS_REQUIRE_CERT, ldap.OPT_X_TLS_NEVER)
            self.ld = ldap.initialize(self.ldap_server)
            self.ld.set_option(ldap.OPT_REFERRALS,0)
            self.ld.set_option(ldap.OPT_PROTOCOL_VERSION,3)
            self.ld.set_option(ldap.OPT_X_TLS,ldap.OPT_X_TLS_DEMAND)
            self.ld.set_option(ldap.OPT_X_TLS_DEMAND,True)
            self.ld.set_option(ldap.OPT_DEBUG_LEVEL,255)
        except ldap.LDAPError, e:
            raise CustomServerFailed("Could not connect to ldap.Try again later.LDAPError: " + str(e))

    def auth(self, username, password):
        self.connect()
    	try:
            # Search for the user with anonymous bind
            self.ld.simple_bind()
            lfilter = "uid=" + username
            result = self.ld.search_s(self.base, self.scope, lfilter)
            if len(result) == 1:
                user_dn = result[0][0]
                try:
                    # If authentication successful, get the full user data
                    self.ld.simple_bind_s(str(user_dn), password)
                    success = True
                    self.ld.unbind_s()
                    return result[0]
                except ldap.LDAPError, e:
                    raise CustomAuthenticationFailed("Invalid credentials.LDAPError: " + str(e))
            else:
                raise CustomAuthenticationFailed("No such user.")
    	except ldap.LDAPError, e:
            raise CustomAuthenticationFailed("Could not authenticate.LDAPError: " + str(e))
        self.ld.unbind_s()

    def all(self):
        results = self.ld.search_s(self.base, self.scope, self.lfilter, self.retrieve_attributes)
